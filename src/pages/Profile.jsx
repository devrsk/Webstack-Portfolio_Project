import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";
import "./Profile.css";

function Profile() {
  const auth = getAuth();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    phoneNumber: "",
  });

  const { name, email, phoneNumber } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        console.log("Fetching user listings...");

        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );

        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
        console.log("User listings fetched successfully:", listings);
      } catch (error) {
        console.error("Error fetching user listings:", error);
        toast.error("Could not fetch data!");
      }
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
        console.log("Profile details updated successfully");
      }
      if (phoneNumber.trim() !== "") {
        // Update phone number in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          phoneNumber: phoneNumber,
        });
        console.log("Phone number updated successfully");
      }
      toast.success("Profile details updated!");
    } catch (error) {
      console.error("Error updating profile details:", error);
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteDoc(doc(db, "listings", listingId));
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingId
        );
        setListings(updatedListings);
        toast.success("Listing Deleted!");
        console.log("Listing deleted successfully");
      } catch (error) {
        console.error("Error deleting listing:", error);
        toast.error("Could not delete listing");
      }
    }
  };

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

  console.log("Rendering Profile component...");

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={onLogout}>
          Log Out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <div className="formGroup">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">
                <strong>Email (*Cannot Change)</strong>
              </label>
              <input
                type="text"
                id="email"
                className="profileEmail"
                disabled={true}
                value={email}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="phoneNumber">
                <strong>Phone Number</strong>
              </label>
              <input
                type="text"
                id="phoneNumber"
                className={!changeDetails ? "profilePhoneNumber" : "profilePhoneNumberActive"}
                disabled={!changeDetails}
                value={phoneNumber || ""}
                onChange={onChange}
                placeholder="N/A"
              />
            </div>
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or Rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
