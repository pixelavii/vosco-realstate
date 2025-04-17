import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

const CityName = () => {
  const router = useRouter();
  const { cityName } = router.query;
  const [combinedData, setCombinedData] = useState({});
  const [coords, setCoords] = useState({ latitude: 51.505, longitude: -0.09 });
  const [location, setLocation] = useState("Your Location");

  const getData = async (cityName) => {
    try {
      const LocData = await axios.post("/api/projects", {
        cityName,
      });
      const Data = LocData.data.profile;
      setCombinedData(Data);
      return Data;
    } catch (err) {
      console.log(err);
    }
  };

  const getCoordinates = async (location) => {
    const access_key = "3a13e9b5ddff4984ccd2b3a0f64b5534";

    try {
      const res = await axios.get(`http://api.positionstack.com/v1/forward`, {
        params: {
          access_key,
          query: location,
          limit: 1,
        },
      });

      const data = res.data.data[0];
      return {
        latitude: data.latitude,
        longitude: data.longitude,
      };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  async function MapData(MapCoordinates) {

    document.querySelector(".dataLoader").style.display = "flex";

    const mapLocation = MapCoordinates.text.split("\n");
    const ExactCoordinates = mapLocation[1];
    const loc = await getCoordinates(ExactCoordinates);

    if (loc) {
      setCoords(loc);
      setLocation(ExactCoordinates);
    }

    document.querySelector(".dataLoader").style.display = "none";
    document.querySelector(".AfterGettingDataFunc ").style.display = "flex";
    
  }

  function CloseMap() {
    document.querySelector(".AfterGettingData ").style.display = "none";
  }

  useEffect(() => {
    if (!router.isReady || !cityName) return;
    getData(cityName);
  }, [router.isReady, cityName]);

  if (!cityName) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className="text-2xl flex justify-center items-center m-5 uppercase">
        The RealState data for {cityName} location
      </div>

      <div className="text-2xl AfterGettingData AfterGettingDataFunc z-30 fixed flex-col inset-28 hidden items-center justify-center bg-opacity-80">
        <DynamicMap coords={coords} location={location} />
        <button
          onClick={CloseMap}
          className="m-5 p-2 cursor-pointer text-md bg-black text-white rounded-2xl"
        >
          X
        </button>
      </div>
      <div className="loader dataLoader hidden">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>

      <div className="flex justify-center items-center">
        <div className="m-5">
          {combinedData.RealState ? (
            <div className="grid grid-cols-4 gap-5">
              {combinedData.RealState.map((follow, index) => (
                <div className="p-4 bg-gray-800 shadow-lg shadow-sky-500 rounded-2xl">
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    key={index}
                    className="text-gray-300 text-left text-[16px] font-semibold"
                  >
                    {follow.text || "Loading"}
                  </p>
                  <button
                    onClick={() =>
                      MapData(combinedData.RealStateMapData[index])
                    }
                    className="p-1 mt-3 cursor-pointer bg-gray-500 rounded-xl"
                  >
                    See Map
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CityName;
