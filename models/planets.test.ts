import { assertEquals } from "../test_deps.ts";
import { filterHabitablePlanets } from "./planets.ts";

// Test data positive case
const HABITABLE_PLANET = {
	koi_disposition: "CONFIRMED",
	koi_prad: "1",
	koi_srad: "1",
	koi_smass: "1"
}

// Test data negative case
const NOT_CONFIRMED = {
	koi_disposition: "FALSE POSITIVE",
}

const TOO_LARGE_PLANETARY_RADIUS = {
	koi_disposition: "CONFIRMED",
	koi_prad: "1.5",
	koi_srad: "1",
	koi_smass: "1"
}

const TOO_LARGE_SOLAR_RADIUS = {
	koi_disposition: "CONFIRMED",
	koi_prad: "1",
	koi_srad: "1.01",
	koi_smass: "1"
}

const TOO_LARGE_SOLAR_MASS = {
	koi_disposition: "CONFIRMED",
	koi_prad: "1",
	koi_srad: "1",
	koi_smass: "1.04"
}

// Test for filtering habitable planets
Deno.test("filter only habitable planets", () => {
	const filtered = filterHabitablePlanets([
		HABITABLE_PLANET,
		NOT_CONFIRMED,
		TOO_LARGE_SOLAR_MASS,
		TOO_LARGE_SOLAR_RADIUS,
		TOO_LARGE_PLANETARY_RADIUS
	])

	assertEquals(filtered, [
		HABITABLE_PLANET
	]);
});