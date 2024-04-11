import { PostCreate, PostList } from "@components";

function App() {
  return (
    <div className="bg-grey1 h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6 w-5/6 h-5/6 p-6 rounded-2xl font-Rubik text-6xl text-black font-bold bg-grey4 drop-shadow-customDark border-[0.5px] border-grey4">
        <PostCreate />
        <PostList />
      </div>
    </div>
  );
}

export default App;
