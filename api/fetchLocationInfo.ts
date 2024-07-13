import axios from "axios";

const fetchLocationDetails = async (latitude: number, longitude: number) => {
  //Probaly shouldn't push this API key even though it is just a public API. If you want to get this to run properly go to: https://myprojects.geoapify.com/projects and create one :)
  const apiKey = "";
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const locationData = response.data;

    const address = locationData.features[0]?.properties;
    const addressLine1 = address?.address_line1 || "Unknown address";
    const addressLine2 = address?.address_line2 || "";

    return `${addressLine1}, ${addressLine2}`;
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw new Error("Error fetching location details. Please try again.");
  }
};

export default fetchLocationDetails;
