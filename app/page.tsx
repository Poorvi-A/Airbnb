import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { Listing } from "@prisma/client";
import { SafeUser } from "./types";

interface HomeProps {
  searchParams: IListingsParams;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const searchParams = context.query as IListingsParams;

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  return {
    props: {
      listings,
      currentUser,
    },
  };
};

interface ServerSideHomeProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const Home = ({ listings, currentUser }: ServerSideHomeProps) => {
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