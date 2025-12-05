import CreateList from "./components/CreateList";
import Header from "./components/Header";

export default function Page() {
  return (
    <>
      <Header title="Home" />
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        {/* <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
        <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" /> */}
        <CreateList />
      </div>
    </>
  );
}
