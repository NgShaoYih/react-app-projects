import { Link } from "react-router-dom";
import { getSamples } from "../data/songs";
import HeaderFooter from "../components/headerfooter";
import '../App.css';
import { useEffect, useState } from "react";

/**
 * The homepage of the Songtrax application
 * @returns Songtrax homepage component
 */
export default function App() {
  
  const [songs, setSongs] = useState([])

  useEffect(() => {
    getSamplesLocal()
  }, [])
  
  const getSamplesLocal = async() => {
    const data = await getSamples();
    setSongs(data)
  }

    return (
      
      <HeaderFooter>
        <main>
        <h2 class="title">My Songs</h2>

        <div class="create-card">
            <Link to={`/edit/create`}>Create Sample</Link>
        </div>

        <section class="sample">
          <ul>
            {songs.map((song) => (
              <li>
                <div class="card">
                <div class="song-details">
                      <h3>{song.name}</h3>
                      <p>{song.datetime}</p>
                      {/* datetime is printed in full but i only want date  */}
                </div>
                <div class="button-group-container">
                    <Link to={`/share/${song.id}`}>Share</Link>
                    <a href="#" class="button">Preview</a>
                    <Link to={`/edit/${song.id}`} class="bright-button">Edit</Link>
                </div>
              </div>
              </li>
            ))}
          </ul>
            
        </section>

        <div class="create-card">
            <Link to={`/edit/create`}>Create Sample</Link>
        </div>
    </main>

      </HeaderFooter>
    );
}
