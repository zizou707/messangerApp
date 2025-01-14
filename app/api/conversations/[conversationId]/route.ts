import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser()

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                users: true,
            }
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                hasSome: [currentUser.id]
            }
        }});

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        return NextResponse.json(deletedConversation)
        
    } catch (error: unknown) {
       console.error(error, 'Error deleting conversation' )
       return new Response('Internal Error' , { status: 500 })
    }
}