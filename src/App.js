import React, { useState } from 'react';
import './App.css';

function App() {
  // Login state and user info
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFirstName, setLoginFirstName] = useState('');
  const [loginLastName, setLoginLastName] = useState('');
  const [loginMemberId, setLoginMemberId] = useState('');
  const [user, setUser] = useState({ firstName: '', lastName: '', memberId: '' });

  // Suggestions state
  const [suggestion, setSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Toggle states for TECHSPO and workshops
  const [showTechspo, setShowTechspo] = useState(false);
  const [showDreamCast, setShowDreamCast] = useState(false);
  const [showNetworking, setShowNetworking] = useState(false);

  // Combined Schedule: overall conference + competitive events merged into one
  const combinedSchedule = {
    "Wednesday, April 2, 2025": [
      { title: "Registration", time: "3:00 p.m. - 7:00 p.m. ET", location: "" },
      { title: "Chapter Time", time: "4:00 p.m. - 5:00 p.m. ET", location: "" }
    ],
    "Thursday, April 3, 2025": [
      { title: "Biotechnology - Submit Entry", time: "8:00 a.m. - 9:00 a.m.", location: "Exhibit Hall C" },
      { title: "Biotechnology - Judging", time: "9:00 a.m. - 5:00 p.m.", location: "Exhibit Hall C" },
      { title: "General Session 1 – Opening Session", time: "9:00 a.m. - 10:00 a.m. ET", location: "" },
      { title: "TECHSPO", time: "10:00 a.m. - 4:00 p.m. ET", location: "" },
      { title: "VEX - Inspection/Check-In", time: "10:30 a.m. - 11:15 a.m.", location: "Exhibit Hall C" },
      { title: "VEX - Verbal Instructions", time: "11:15 a.m. - 11:30 a.m.", location: "Exhibit Hall C", note: "At least one member from each team must be in attendance" },
      { title: "Assembling the Dream Cast Workshop", time: "11:30 a.m. - 12:15 p.m. ET", location: "" },
      { title: "VEX - Skills Runs", time: "11:45 a.m. - 3:30 p.m.", location: "Exhibit Hall C" },
      { title: "Meet the Candidates Session 1", time: "1:30 p.m. - 2:30 p.m. ET", location: "" },
      { title: "VEX - Alliance Selection/Drivers Meeting", time: "3:30 p.m. - 4:00 p.m.", location: "Exhibit Hall C", note: "At least one member from each team must be in attendance" },
      { title: "Networking Like a Star Workshop", time: "3:30 p.m. - 4:15 p.m. ET", location: "" },
      { title: "Meet the Candidates Session 2", time: "4:30 p.m. - 5:30 p.m. ET", location: "" },
      { title: "VEX - 2 Vs. 2 Elimination Bracket", time: "4:30 p.m. - 5:45 p.m.", location: "Exhibit Hall C" },
      { title: "Biotechnology - Semifinalist Sign-up", time: "6:00 p.m. - 7:00 p.m.", location: "Online" },
      { title: "Webmaster - Semifinalist Sign-up", time: "6:00 p.m. - 7:00 p.m.", location: "Online" },
      { title: "Silent Disco Night", time: "8:00 p.m. - 9:30 p.m. ET", location: "" }
    ],
    "Friday, April 4, 2025": [
      { title: "Voting Delegates Meeting", time: "8:00 a.m. - 8:45 a.m. ET", location: "" },
      { title: "Biotechnology - Semifinalist Presentations/Interviews", time: "9:30 a.m. - 11:30 a.m.", location: "Exhibit Hall C" },
      { title: "Webmaster - Semifinalist Interviews", time: "9:30 a.m. - 11:30 a.m.", location: "Mtg. Room 17" },
      { title: "TECHSPO", time: "10:00 a.m. - 4:00 p.m. ET", location: "" },
      { title: "Biotechnology - Pick-up", time: "5:00 p.m. - 5:30 p.m.", location: "Exhibit Hall C" },
      { title: "General Session 2 – Business Session", time: "7:30 p.m. - 8:30 p.m. ET", location: "" }
    ],
    "Saturday, April 5, 2025": [
      { title: "General Session 3 – Awards Ceremony", time: "8:30 a.m. - 11:30 a.m. ET", location: "" }
    ]
  };

  // Workshop Information for collapsible workshops
  const workshopInfo = {
    "Assembling the Dream Cast": "Join the State Officer Team to master the art of assembling your dream team! Learn effective task delegation, ensure everyone contributes to overall goals, and discover conflict resolution strategies to foster collaboration.",
    "Networking Like a Star": "Build a networking mindset, create a strong personal brand, and develop the skills needed to grow professional connections through interactive activities and real-world examples."
  };

  // Chattanooga Information (attractions and dining)
  const chattanoogaInfo = {
    attractions: [
      { name: "Tennessee Aquarium", address: "1 Broad St, Chattanooga, TN 37402" },
      { name: "Lookout Mountain (Rock City & Ruby Falls)", address: "1400 Lookout Mountain Blvd, Chattanooga, TN 37403" },
      { name: "Walnut Street Bridge", address: "Walnut St, Chattanooga, TN 37402" },
      { name: "Chattanooga Choo Choo", address: "1400 Market St, Chattanooga, TN 37402" },
      { name: "Creative Discovery Museum", address: "321 Broad St, Chattanooga, TN 37402" }
    ],
    dining: [
      { name: "Puckett’s Grocery & Restaurant", address: "202 Market St, Chattanooga, TN 37402" },
      { name: "Maple Street Biscuit Company", address: "2020 Maple St, Chattanooga, TN 37402" },
      { name: "Champy’s World Famous Fried Chicken", address: "214 McCallie Ave, Chattanooga, TN 37403" },
      { name: "Mellow Mushroom", address: "2727 S 12th St, Chattanooga, TN 37405" },
      { name: "Tupelo Honey", address: "95 Main St, Chattanooga, TN 37402" },
      { name: "Urban Stack", address: "1717 E 2nd St, Chattanooga, TN 37402" },
      { name: "Community Pie", address: "2113 8th St, Chattanooga, TN 37403" },
      { name: "Jimmy John’s", address: "1234 E 2nd St, Chattanooga, TN 37402" },
      { name: "Five Guys", address: "4567 E 2nd St, Chattanooga, TN 37402" },
      { name: "Panera Bread", address: "789 Main St, Chattanooga, TN 37402" },
      { name: "Chili’s", address: "1010 Market St, Chattanooga, TN 37402" },
      { name: "Big River Grille", address: "1111 Broad St, Chattanooga, TN 37402" }
    ]
  };

  // Handler functions
  const toggleTechspo = () => setShowTechspo(!showTechspo);
  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (suggestion.trim()) {
      setSuggestions([...suggestions, suggestion]);
      setSuggestion('');
    }
  };
  const handleRemoveSuggestion = (index) => {
    setSuggestions(suggestions.filter((_, i) => i !== index));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginFirstName.trim() && loginLastName.trim() && loginMemberId.trim()) {
      setUser({ firstName: loginFirstName, lastName: loginLastName, memberId: loginMemberId });
      setLoggedIn(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input type="text" placeholder="First Name" value={loginFirstName} onChange={(e) => setLoginFirstName(e.target.value)} className="login-input" />
          <input type="text" placeholder="Last Name" value={loginLastName} onChange={(e) => setLoginLastName(e.target.value)} className="login-input" />
          <input type="text" placeholder="Member ID" value={loginMemberId} onChange={(e) => setLoginMemberId(e.target.value)} className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{user.firstName} {user.lastName}'s Personal TSA Schedule</h1>
      </header>
      <main className="main-content">
        {/* Combined Schedule Section */}
        <section className="section-box overall-schedule">
          <h2>Your Conference Schedule</h2>
          {Object.entries(combinedSchedule).map(([day, events]) => (
            <div key={day} className="day-schedule">
              <h3>{day}</h3>
              <ul className="schedule-list">
                {events.map((item, index) => (
                  <li key={index} className="schedule-item">
                    <strong>{item.title}</strong><br />
                    Time: {item.time}<br />
                    {item.location && <>Location: {item.location}<br /></>}
                    {item.note && <span className="event-note"><em>{item.note}</em></span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* TECHSPO Details */}
        {showTechspo && (
          <section className="section-box techspo-section">
            <h2>TECHSPO Information</h2>
            <p>
              Colleges and industry partners will be exhibiting throughout the conference. Students are invited to connect with these representatives to explore college and career opportunities.
            </p>
            <p>
              Tables will be active from 10 a.m. to 4 p.m. on both Thursday, April 3 and Friday, April 4 in the main hallway of the Chattanooga Convention Center. A full list of participating organizations will be available in the Conference Program.
            </p>
            <p>
              For suggestions, please contact <a href="mailto:Brent.Payne@tntsa.org">Brent.Payne@tntsa.org</a>.
            </p>
          </section>
        )}

        {/* Workshop Information Section */}
        <section className="section-box workshop-section">
          <h2>Workshop Information</h2>
          <ul className="workshop-list">
            <li className="workshop-item">
              <button onClick={() => setShowDreamCast(!showDreamCast)}>
                Assembling the Dream Cast {showDreamCast ? "▲" : "▼"}
              </button>
              {showDreamCast && <p>{workshopInfo["Assembling the Dream Cast"]}</p>}
            </li>
            <li className="workshop-item">
              <button onClick={() => setShowNetworking(!showNetworking)}>
                Networking Like a Star {showNetworking ? "▲" : "▼"}
              </button>
              {showNetworking && <p>{workshopInfo["Networking Like a Star"]}</p>}
            </li>
          </ul>
        </section>

        {/* Things To Do Around Chattanooga Section */}
        <section className="section-box chattanooga-section">
          <h2>Things To Do Around Chattanooga</h2>
          <ul className="schedule-list">
            {chattanoogaInfo.attractions.map((attr, index) => (
              <li key={index} className="schedule-item">
                <strong>{attr.name}</strong><br />
                Address: {attr.address}
              </li>
            ))}
            <li className="schedule-item">
              <strong>Dining & Local Favorites:</strong><br />
              {chattanoogaInfo.dining.map((dine, index) => (
                <span key={index}>
                  {dine.name} – {dine.address}<br />
                </span>
              ))}
            </li>
          </ul>
        </section>

        {/* Suggestions Section */}
        <section className="section-box suggestions-section">
          <h2>Suggestions</h2>
          <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
            <textarea
              className="suggestion-input"
              placeholder="Enter your suggestion here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows="4"
            />
            <button type="submit" className="submit-button">Submit Suggestion</button>
          </form>
          {suggestions.length > 0 && (
            <div className="submitted-suggestions">
              <h3>Submitted Suggestions:</h3>
              <ul>
                {suggestions.map((item, index) => (
                  <li key={index} className="suggestion-item">
                    {item}
                    <button className="remove-button" onClick={() => handleRemoveSuggestion(index)}>X</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
