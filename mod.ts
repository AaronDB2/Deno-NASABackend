import { Application } from "https://deno.land/x/oak@v6.4.0/mod.ts";

const app = new Application();				// Initialize Application
const PORT = 8000; 							// Port number


// log middelware
app.use(async (ctx, next) => {
	await next();
	const time = ctx.response.headers.get("X-Response-Time");
	console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

// Measure time executed Middleware
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const delta = Date.now() - start;
	ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

// Simpel message middleware
app.use(async (ctx, next) => {
	ctx.response.body = "NASA Mission Control API";

	await next();
});



// Checks if file is runned as a program and not imported
if (import.meta.main){
	await app.listen({
		port: PORT
	});
}