import { Astro } from 'astro';

// Importa Stripe dinámicamente para manejar la compatibilidad del entorno
const loadStripe = async () => {
  if (typeof window === 'undefined') {
    const stripeModule = await import('stripe');
    return stripeModule.default;
  } else {
    console.warn("Stripe debe inicializarse en el servidor, no en el cliente.");
    return null;
  }
};

export async function POST(context) {
  try {
    console.log('API de pago iniciada');

    const stripeKey = import.meta.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      console.error('No se encontró la clave de API de Stripe');
      return new Response(
        JSON.stringify({ error: 'Configuración de Stripe no disponible' }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const Stripe = await loadStripe();
    if (!Stripe) {
      return new Response(
        JSON.stringify({ error: 'Error al cargar la biblioteca de Stripe' }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const stripe = new Stripe(stripeKey);


    const siteUrl = new URL(context.request.headers.get('origin') || Astro.site).origin;
    console.log("siteURL", siteUrl);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Versión Pro – ProgressoDev' },
            unit_amount: 290,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/exito`,
      cancel_url: `${siteUrl}/`,
    });

    console.log('Sesión de Stripe creada correctamente:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.error('Error de Stripe:', err);
    return new Response(
      JSON.stringify({ error: 'Error creando la sesión', message: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
