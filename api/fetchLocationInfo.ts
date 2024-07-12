import axios from "axios";

const fetchLocationDetails = async (latitude: number, longitude: number) => {
  const apiKey = "06019eebf5bc4bbcb257785cf189bf60";
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
