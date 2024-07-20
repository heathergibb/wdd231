const parkData = "../project/data/campgrounds.json";

async function getParkData() {
    try {
        const response = await fetch(parkData);
        const data = await response.json();

        return (data.campgrounds);
    } catch (error) {
        console.error("Error fetching campground data:", error);
    }
}

export async function filterCampgrounds(parkName) {
    let campgrounds = await getParkData();
    
    if (parkName !== "all") {
        campgrounds = campgrounds.filter((campground) => campground.park === parkName);
    }

    return campgrounds;
}