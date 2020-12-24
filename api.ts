import { Router } from "./deps.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

// Set correct respone for the "/" url
router.get("/", (ctx) => {
	ctx.response.body = "NASA Mission Control API";
});

// Set correct respone for the "/planets" url
router.get("/planets", (ctx) => {
	ctx.response.body = planets.getAllPlanets();
});

// Set correct respone for the "/launches" url
router.get("/launches", (ctx) => {
	ctx.response.body = launches.getAllLaunches();
});

// Set correct respone for the "/launches:id" url
router.get("/launches:id", (ctx) => {
	if (ctx.params?.id){
		const launchesList = launches.getOne(Number(ctx.params.id));
		if (launchesList){
			ctx.response.body = launchesList
		} else {
			ctx.throw(400, "Launch with that ID doesn't exist");
		}
	}
});

// Post request router for "/launches" url
router.post("/launches", async (ctx) => {
	const body = await ctx.request.body();
	const data: launches.Launch = await body.value;
	launches.addOne(data);

	ctx.response.body = { success: true};
	ctx.response.status = 201;
});

// Delete request router for "/launches/:id" url
router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

export default router;