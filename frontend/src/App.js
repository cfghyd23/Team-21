import SignInSide from './Pages/SignIn'
import SignUp from './Pages/SignUp';
import Forgot from './Pages/Forgot'
import ForgotEmail from './Pages/ForgotEmail'
import Submit_issue from './Pages/Submit_issue'
import IssueCard from './Pages/IssueCard';
import IssueList from './Pages/IssueColumnList';
import TabBar from './Pages/TabBar';
import IssueUpdate from './Pages/IssueUpdate'
import IssueYAList from './Pages/IssueYAList';
import Announcement from './Pages/AddAnnouncement';
import Announcements from './Pages/Announcements';
import SingleAnnouncements from './Pages/SingleAnnouncement'
import Album from './Pages/Album';

import {Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Album />} />
      <Route path="/addIssue" element={<Submit_issue />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignInSide />} />
      <Route path="/forgotPassword" element={<ForgotEmail />} />
      <Route path="/setPassword" element={<Forgot />} />
      <Route path="/issues" element={<TabBar />} />
      <Route path="/editIssue" element={<IssueUpdate />} />
      <Route path="/issuesOfYA" element={<IssueYAList />} />
      <Route path="/addAnnouncement" element={<Announcement />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/singleAnnouncement" element={<SingleAnnouncements />} />

    </Routes>
    </div>
  );
}

export default App;
