import { _, parse, BufReader, log, join } from "../deps.ts";

type Planet = Record<string, string>; 

let planets : Array<Planet>;

// Filter data too find habitable planets
export function filterHabitablePlanets(planets : Array<Planet>) {
	return planets.filter((planet) => {
		const planateryRadius = Number(planet["koi_prad"]);
		const stellerMass = Number(planet["koi_smass"]);
		const stellarRadius = Number(planet["koi_srad"]);

		return planet["koi_disposition"] === "CONFIRMED" 
		&& planateryRadius > 0.5 && planateryRadius < 1.5
		&& stellerMass > 0.78 && stellerMass < 1.04
		&& stellarRadius > 0.99 && stellarRadius < 1.01;
	});
}

// Read csv file and return the habitable planets from the csv file
async function readCSVFile() {
	const path = join("data", "kepler_exoplanets_nasa.csv"); // Allows running on multiples os systems so you dont have path conflicts

	const file = await Deno.open(path);
	const bufReader = new BufReader(file);
	const result = await parse(bufReader, {skipFirstRow: true, comment: "#"} );
	Deno.close(file.rid);

	const planets = filterHabitablePlanets(result as Array<Planet>)

	// Pick properties from the planets
	return planets.map((planet) => {
		return _.pick(planet, [
			"koi_prad",
			"koi_smass",
			"koi_srad",
			"kepler_name",
			"koi_count",
			"koi_steff"
		]);
	});
}

planets = await readCSVFile();

log.info(`${planets.length} habitable plants found! `)

export function getAllPlanets(){
	return planets;
}