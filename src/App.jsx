import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

// import SideBar from "./components/SideBar";
// import Footer from "./components/Footer";

function LayoutWrapper() {
  // const [menu, setMenu] = useState(true);
  // const location = useLocation();

  return (
    <div>
      {/* <SignedIn>
        {(location.pathname === "/" || location.pathname === "/dashboard") && (
          <SideBar valueMenu={menu} showProfile={menu} />
        )}
      </SignedIn> */}

      {/* <div
        className="hidden md:block md:w-1/5 md:h-[93vh] md:box-border"
        onClick={() => setMenu(true)}
      ></div> */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/task/edit/:id" element={<EditPage />} /> */}
        </Routes>
      </SignedIn>

      <SignedOut>
        <div className="w-full h-full pt-52 flex flex-col justify-start items-center gap-5 ">
          <span className="w-auto h-auto mx-7 md:w-auto md:min-h-1/4 md:mx-0 py-2 px-3 bg-[#2F2B2B]/70 text-[#F5F5F5] rounded-lg">
            <span className="w-full flex justify-center text-2xl font-semibold">
              ATENÇÃO
            </span>
            <p>
              Se for apenas testar o site, Por favor usar o seguinte email e
              senha.
              <br />
              <b>Email:</b> test_email+clerk_test@example.com <br />
              <b>Senha:</b> test_email+clerk_test@example.com
            </p>
          </span>
          <SignInButton className="w-36 h-9 my-1 mx-3 py-1 px-2 bg-[#2C3E50] rounded-md text-[#F5F5F5] text-sm font-bold cursor-pointer hover:bg-[#243342] hover:text-[#cccccc]">
            Entrar
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}

function RootApp() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default RootApp;
