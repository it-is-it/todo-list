import CreateList from "./components/CreateList";
import Header from "./components/Header";

export default function Page() {
  return (
    <>
      <Header title="Home" />
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        <CreateList />
      </div>
    </>
  );
}
