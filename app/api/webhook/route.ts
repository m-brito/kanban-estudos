import { NextResponse } from 'next/server';
import { STRING_LITERAL_DROP_BUNDLE } from 'next/dist/shared/lib/constants';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { subscribe } from 'diagnostics_channel';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch (error) {
        return new NextResponse('Webhook error', { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );
        if (!session?.metadata?.orgId) {
            return new NextResponse('org ID is required', { status: 400 });
        }


    }

    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );


    }

    return new NextResponse(null, { status: 200 });
}
