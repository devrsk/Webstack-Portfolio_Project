import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import NavigationBar from "./Header.jsx";

function Category() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log("Fetching initial listings...");

        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(3)
        );

        const querySnap = await getDocs(q);

        const fetchedListings = querySnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setListings(fetchedListings);
        setLastFetchedListing(querySnap.docs[querySnap.docs.length - 1]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  const fetchMoreListings = async () => {
    try {
      console.log("Fetching more listings...");

      if (!lastFetchedListing) return;

      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      const querySnap = await getDocs(q);

      const fetchedListings = querySnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setListings((prevListings) => [...prevListings, ...fetchedListings]);
      setLastFetchedListing(querySnap.docs[querySnap.docs.length - 1]);
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch more listings");
    }
  };

  console.log("Listings:", listings);

  return (
    <div className="category">
      <header>
	<NavigationBar/>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />

          {lastFetchedListing && (
            <p className="loadMore" onClick={fetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
