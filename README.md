# Bracket Busters

Bracket Busters is an application allows users to compete against their friends by choosing winners for real world sports games.

You are able to create and manage your own leagues and will have a personal scoreboard for each participant. Each league will also have its own message board that will allow you to communicate with those in your league. Each league also has the option to be private or public.

If you are not participating in a league or would like to communicate with those outside of your league, you can also create a group. Like a league, each group has its own message board so users can communicate with each other.

## Backend

Information about the backend of Bracket Busters can be found here: [CF Madness](https://github.com/sportsfellows/sports-app)

## Tech/Framework/Packages

- node 
- MongoDB
- travis
- heroku
- github
- npm
- node packages:
  - babel-core          
  - babel-loader          
  - babel-plugin-transform-class-properties          
  - babel-plugin-transform-object-rest-spread          
  - babel-preset-env          
  - babel-preset-react          
  - bootstrap          
  - clean-webpack-plugin          
  - cors          
  - css-loader          
  - dotenv          
  - express          
  - extract-text-webpack-plugin          
  - file-loader          
  - font-awesome          
  - html-webpack-plugin          
  - lodash          
  - node-sass          
  - npm          
  - raw-loader          
  - react          
  - react-bootstrap          
  - react-dom          
  - react-redux          
  - react-router          
  - react-router-dom          
  - redux          
  - redux-logger          
  - resolve-url-loader          
  - sass-loader          
  - style-loader          
  - superagent          
  - uglifyjs-webpack-plugin          
  - url-loader          
  - validator          
  - webpack          
  - webpack-dev-server          
- devDependencies:
  - babel-jest          
  - enzyme          
  - enzyme-adapter-react-16          
  - eslint          
  - eslint-plugin-react          
  - jest          
  - redux-devtools-extension          

## Component Tree
```
<App>
  <Navbar>
    <Avatar>
    <Icons>
  <LandingContainer>
    <CreateSection>
    <JoinSection>
    <Modal>
    <Intro>
      <Modal>
      <UserAuthForm>
    <ProfileContainer>
      <ProfileForm>
    <LeagueAllContainer>
      <LeagueAllPublicList>
      <PrivateLeagueForm>
    <LeagueItemContainer>
      <LeagueItem>
      <LeagueForm>
      <Messageboard>
      <Scoreboard>
      <UserPickContainer>
        <GamesList>
        <UserPickForm>
        <UserPickItem>
    <GroupAllContainer>
      <GroupAllPublicList>
      <PrivateGroupForm>
    <GroupItemContainer>
      <GroupItem>
      <GroupForm>
      <Messageboard>
  <Footer>
```

## License

MIT © [Brian Bixby](https://github.com/brianbixby),
<!-- join and create league/group get a messageboard; also when you click on group, also logic if you sign into the page with a token; or logic to make token redirect to homepage -->

to do
  - navbar
      fix height 
      fix logged in avatar photo
  - footer 
      https://theundefeated.com/features/kareem-says-ballers-just-want-to-have-fun-on-dancing-with-the-stars/ 
  - dev tools 
      hyperlink and message
  - intro 
      remove footer
    - modal 
        set min password length to 8 charachters
        max username to 12 charachters
  - landing container
      make navbar dropdown always be closed at first
      leagues and groups hover add color
    - modal
      fix birthdate
        - create league/group modal is too big for page
  - league 
      fix picks 
      fix games 
      fix scoreboard 
      fix messageboard 
      add ability to update league 
      delete league 
      quit league
  - group 
      fix messageboard 
      add description and image 
      add ability to update group
      delete group 
      quit group
  - profile

  - general
      refactor css 
      make efficient 
      combine classes 
      add browser specific css specifications
      add etags and cacheing and etag checking 
      add web beacons 
      o 1 user lookup for sign in

today i am going to fix everything on league
    