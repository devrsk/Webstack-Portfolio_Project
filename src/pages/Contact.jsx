import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import NavigationBar from "./Header.jsx";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      console.log("Fetching landlord data...");

      const docRef = doc(db, "users", params.landlordId);
      console.log("docRef:", docRef);

      try {
        const docSnap = await getDoc(docRef);
        console.log("docSnap:", docSnap);

        if (docSnap.exists()) {
          console.log("Landlord data retrieved:", docSnap.data());
          setLandlord(docSnap.data());
        } else {
          console.log("Landlord data not found.");
          toast.error("Could not get landlord data");
        }
      } catch (error) {
        console.log("Error fetching landlord data:", error);
        toast.error("Could not fetch landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  console.log("Landlord:", landlord);

  return (
    <div className="pageContainer">
      <header>
	<NavigationBar/>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
            <div className="phoneNumber">
              <p>Phone Number: {landlord?.phoneNumber || "N/A"}</p>
            </div>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button className="primaryButton" type="button">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
