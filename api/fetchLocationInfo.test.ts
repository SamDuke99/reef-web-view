import axios from "axios";
import fetchLocationDetails from "./fetchLocationInfo";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchLocationDetails", () => {
  it("should return address when API call is successful", async () => {
    const mockResponse = {
      data: {
        features: [
          {
            properties: {
              address_line1: "Elland Rd",
              address_line2: "Beeston, Leeds LS11 0ES",
            },
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const latitude = 53.7775;
    const longitude = -1.5723;
    const address = await fetchLocationDetails(latitude, longitude);

    expect(address).toBe("Elland Rd, Beeston, Leeds LS11 0ES");
  });

  it("should return 'Unknown address' when address_line1 is missing", async () => {
    const mockResponse = {
      data: {
        features: [
          {
            properties: {
              address_line2: "Beeston, Leeds LS11 0ES",
            },
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const latitude = 53.7775;
    const longitude = -1.5723;
    const address = await fetchLocationDetails(latitude, longitude);

    expect(address).toBe("Unknown address, Beeston, Leeds LS11 0ES");
  });

  it("should return empty string for address_line2 when it is missing", async () => {
    const mockResponse = {
      data: {
        features: [
          {
            properties: {
              address_line1: "Elland Rd",
            },
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const latitude = 53.7775;
    const longitude = -1.5723;
    const address = await fetchLocationDetails(latitude, longitude);

    expect(address).toBe("Elland Rd, ");
  });

  it("should throw an error when the API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    const latitude = 53.7775;
    const longitude = -1.5723;

    await expect(fetchLocationDetails(latitude, longitude)).rejects.toThrow(
      "Error fetching location details. Please try again."
    );
  });
});
