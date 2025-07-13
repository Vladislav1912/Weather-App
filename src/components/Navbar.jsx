import React, { useState, useEffect } from 'react';
import { IoReload } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';
import { CgMenu } from 'react-icons/cg';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import { MdOutlineSquare } from 'react-icons/md';
import { TbLetterX } from 'react-icons/tb';
import { FaCloudRain } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  const [city, setCity] = useState("Varna");
  const [weather, setWeather] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=11217814e297d511d38959831ab21c04`;

  const getCityData = async () => {
    if (!city) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setWeather(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCityData();
  }, [])

  //for scrolling with mouse weel
  useEffect(() => {
    const container = document.querySelector('.hour-strip');
    if (!container) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <nav className="glass-nav navbar px-3">
        <button className="reload me-auto">
          <IoReload />
        </button>

        <ul className="navbar-nav flex-row gap-2 ms-auto">
          <li className="nav-item"><button className="icon-btn"><BiTargetLock /></button></li>
          <li className="nav-item"><button className="icon-btn"><CgMenu /></button></li>
          <li className="nav-item"><button className="icon-btn"><TfiLayoutLineSolid /></button></li>
          <li className="nav-item"><button className="icon-btn"><MdOutlineSquare /></button></li>
          <li className="nav-item"><button className="icon-btn"><TbLetterX /></button></li>
        </ul>
      </nav>

      <div className="glass-card d-flex justify-content-between align-items-center text-white px-4 py-3">
        <div className="container">

          <div className="row height d-flex justify-content-center align-items-center">

            <div className="col-md-4">

              <div className="search">
                <p className="iconSearch"><IoSearch /></p>
                <input type="text" class="inputCity" placeholder="Enter city..."
                  onChange={(e) => setCity(e.target.value)} />
                <button className="searchButton" onClick={getCityData}>Search</button>


              </div>

            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-lg-5">
                <FaCloudRain size={55} />
                <div className="temp-text">
                  <h3 className="mb-1">{weather?.weather?.[0]?.description || "—"}</h3>
                  <h1 className="m-0">{weather ? `${weather.main.temp}°C` : "—"}</h1>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-end">
                <h1 className="mb-1">{weather?.name || "—"}</h1>
                <h2 className="m-0">Feels Like • {weather ? `${weather.main.feels_like}°C` : "—"}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 text-white">
        <div className="row gx-4 gy-4">
          <div className="col-lg-8 d-flex flex-column">


            <div className="glass-subcard p-3 rounded-4" style={{ background: "rgba(0,0,0,.35)" }}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div className="btn-group float-start" role="group" aria-label="Weather view">
                  <button className="btn btn-sm fw-bold bg-white text-dark">Hourly</button>
                  <button className="btn btn-sm fw-bold btn-outline-light">Wind</button>
                  <button className="btn btn-sm fw-bold btn-outline-light">Precipitation</button>
                </div>
              </div>

              <div className="mb-2">
                <p className="mb-0 fw-bold">Day Max</p>
                <h2 className="m-0 fw-bold"> {weather ? `${weather.main.temp_max}°C` : "-"}</h2>
              </div>


              <div className="d-flex flex-nowrap gap-2 overflow-x-auto pt-3 hour-strip">

                {[{ label: "12 AM", temp: "45", icon: "03d" },
                { label: "01 PM", temp: "46", icon: "02d" },
                { label: "Now", temp: "46", icon: "02d" },
                { label: "03 PM", temp: "47.4", icon: "03d" },
                { label: "04 PM", temp: "47.9", icon: "04d" },
                { label: "05 PM", temp: "49.3", icon: "03d" },
                { label: "06 PM", temp: "49.7", icon: "02n" },
                { label: "07 PM", temp: "50.6", icon: "01n" },
                { label: "08 PM", temp: "51.4", icon: "01n" },
                { label: "09 PM", temp: "51.9", icon: "01n" },
                { label: "10 PM", temp: "48.2", icon: "01n" },
                { label: "11 PM", temp: "46.2", icon: "02n" },
                { label: "12 PM", temp: "45.2", icon: "02n" }].map((h, i) => (
                  <div key={i} className="hour-card rounded-3 text-center p-2 flex-shrink-0">
                    <small className="d-block">{h.label}</small>
                    <img src={`https://openweathermap.org/img/wn/${h.icon}.png`} alt="" style={{ width: "65%" }} />
                    <div className="fw-semibold">{h.temp}°</div>
                  </div>
                ))}
              </div>
            </div>


            <div className="row g-3">
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>Wind</h5>
                  <p>{weather?.wind?.speed} m/s</p>
                  <p>Direction: {weather?.wind?.deg}°</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>Humidity</h5>
                  <p>{weather?.main?.humidity}%</p>
                  <p>Dew Point: —</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>Air Pollution</h5>
                  <p>18 — Good</p>
                  <div className="progress" style={{ height: "6px" }}>
                    <div className="progress-bar bg-success" style={{ width: "18%" }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>Pressure</h5>
                  <p>{weather?.main?.pressure} hPa</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>UV Index</h5>
                  <p>—</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 rounded-4 h-100" style={{ background: "rgba(0,0,0,.35)" }}>
                  <h5>Sunrise & Sunset</h5>
                  <p>Sunrise: —</p>
                  <p>Sunset: —</p>
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4 d-flex flex-column gap-3 h-100">
            <div className="p-3 rounded-4" style={{ background: "rgba(0,0,0,.35)" }}>
              <div className="btn-group w-100 mb-3">
                <button className="btn btn-sm fw-bold bg-white text-dark w-50">Tomorrow</button>
                <button className="btn btn-sm fw-bold btn-outline-light w-50">Weekly</button>
              </div>


              {[{ label: "03 PM", temp: "47.4", icon: "03d" },
              { label: "04 PM", temp: "47.9", icon: "04d" },
              { label: "05 PM", temp: "49.3", icon: "03d" },
              { label: "06 PM", temp: "49.7", icon: "02n" },
              { label: "07 PM", temp: "50.6", icon: "01n" },
              { label: "08 PM", temp: "51.4", icon: "01n" },
              { label: "09 PM", temp: "51.9", icon: "01n" },
              { label: "10 PM", temp: "48.2", icon: "01n" },].map((h, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center px-lg-4 py-lg-4 rounded-3 mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div><small className="fw-semibold">0{i + 1}:00 AM</small></div>
                  <div><img src="https://openweathermap.org/img/wn/02n.png" alt="" style={{ width: "30px" }} /></div>
                  <div className="fw-semibold">46°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


//design
//input za vzemane na city
//strelqne kum API
//vizualizaciq
//Vanko happy! Cvetq i rozi