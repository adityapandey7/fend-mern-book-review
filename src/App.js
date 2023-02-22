import { Route, Routes } from "react-router-dom";
import Review from "./Review/page/Review";
import UserReview from "./Review/page/UserReview";
import NewReview from "./Review/page/NewReview";
import UpdateReview from "./Review/page/UpdateReview";
import ReviewInDetail from "./Review/page/ReviewInDetail";
import User from "./User/Page/User";
import Auth from "./User/Page/Auth";

import MainNavigation from "./common/Component/Navigation/MainNavigation";
import { AuthContext } from "./common/context/auth-context";

import { useAuth } from "./common/hook.js/auth-hook";
import NotFound from "./User/Page/NotFound";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Review />} />
        <Route path="/:userId/review" element={<UserReview />} />
        <Route path="/review/new" element={<NewReview />} />
        <Route path="/review/update/:revId" element={<UpdateReview />} />
        <Route path="/review/:revId" element={<ReviewInDetail />} />
        <Route path="/Users" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Review />} />
        <Route path="/review/:revId" element={<ReviewInDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main>{routes}</main>
      </AuthContext.Provider>
    </>
  );
}

export default App;
