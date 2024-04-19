import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { Listing } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import getListings, { IListingsParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "./types";

interface HomeProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const Home = ({ listings, currentUser }: HomeProps) => {
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={{
                ...listing,
                createdAt: listing.createdAt.toString(),
              }}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;