import {Switch, Route} from "wouter";

import {PrivateRoute, PublicOnlyRoute} from "@shared/lib/routing";

import {HomePage} from "./home";
import {SignUpPage} from "./sign-up";
import {SignInPage} from "./sign-in";
import {OAuth2SignUpPage} from "./sign-up/oauth2";
import {PreferencesPage} from "./preferences";
import {ProfilePage} from "./profile";
import {LeaderboardPage} from "./leaderboard";
import {AboutPage} from "./about";
import {MatchPage} from "./match";

export const Routes: React.FC = () => (
    <Switch>
        <Route path="/" component={HomePage} />
        <PublicOnlyRoute path="/signup" component={SignUpPage} />
        <PublicOnlyRoute path="/signin" component={SignInPage} />
        <PublicOnlyRoute path="/signup/oauth2" component={OAuth2SignUpPage} />
        <PrivateRoute path="/preferences" component={PreferencesPage} />
        <PrivateRoute path="/@/:username" component={ProfilePage} />
        <PrivateRoute path="/leaderboard" component={LeaderboardPage} />
        <PrivateRoute path="/about" component={AboutPage} />
        <Route path="/:matchId" component={MatchPage} />
    </Switch>
);
