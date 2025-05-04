export function GET() {
    try {
        // Recopilar información sobre las variables de entorno (sin mostrar claves completas)
        const envInfo = {
            available: {
            STRIPE_SECRET_KEY: import.meta.env.STRIPE_SECRET_KEY ? 
                `${import.meta.env.STRIPE_SECRET_KEY.substring(0, 7)}...` : 
                'No disponible',
            SITE: import.meta.env.SITE || 'No disponible'
            },
            allKeys: Object.keys(import.meta.env)
            .filter(key => !key.includes('SECRET')) // No incluir claves secretas
        };
        
        // Verificar si Stripe está instalado
        let stripeStatus = 'Sin verificar';
        try {
            require('stripe');
            stripeStatus = 'Instalado';
        } catch (err) {
            stripeStatus = `No instalado: ${err.message}`;
        }
        
        // Información del sistema
        const systemInfo = {
            nodeVersion: process.version,
            platform: process.platform,
            isSSR: typeof window === 'undefined',
            stripeStatus
        };
        
        return new Response(
            JSON.stringify({
            success: true,
            environment: envInfo,
            system: systemInfo
            }),
            {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
            }
        );
        } catch (err) {
        return new Response(
            JSON.stringify({ 
            success: false,
            error: err.message,
            stack: err.stack
            }),
            {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
            }
        );
    }
}