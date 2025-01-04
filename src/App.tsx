
import { Button } from "./components/ui/button";
import { GitHubLogoIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon } from "@radix-ui/react-icons";
const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Vite project generated using automation!</h1>
      <p className="font-normal text-center mt-4 text-xl text-muted-foreground">If you found this script helpful make sure to star the repo and follow the developer.</p>
      <div className="flex mt-6 gap-10">
       
        <Button>
          <a
            href="https://github.com/zaid-commits/vite-shadcn-automation"
            target="_blank"
            className="flex items-center"
          >
            <StarFilledIcon className="mr-2 h-4 w-4 text-yellow-500" />
            Star the repo
          </a>
          <ChevronRightIcon className="mr-2 h-4 w-4" />
        </Button>

        <Button variant={"outline"}>
          <a
            href="https://github.com/zaid-commits/"
            target="_blank"
            className="flex items-center"
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4 text-black" />
            Follow Developer
          </a>
          <ChevronRightIcon className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default App;

