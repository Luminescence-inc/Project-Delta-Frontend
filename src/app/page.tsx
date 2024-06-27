import MultiSearch from "@/components/MultiSearch";
import NMultiSearch from "@/components/NMultiSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bizconnect24",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <main className="p-6">
      Home page
      <h1>Old MultiSearch</h1>
      <MultiSearch
        placeholder="Search for a location"
        type="single"
        label="Location"
        disableTrigger
      />
      <br />
      <h1>New MultiSearch</h1>
      <NMultiSearch
        placeholder="Search for a location"
        type="single"
        label="Location"
        listsData={[
          { uuid: "1", value: "Location" },
          { uuid: "2", value: "Location 2" },
          { uuid: "3", value: "Location 3" },
        ]}
        is_link={true}
      />
    </main>
  );
}
