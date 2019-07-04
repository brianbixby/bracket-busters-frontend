## Project: Bracket Busters (NBA Pick 'em App)

Bracket Busters is an application allows users to compete against their friends by pricking winners for real world NBA basketball games.

You are able to create and manage your own private and public leagues with a real time scoreboard for all participants. Each league has it's own message board  (aka smack talk board) that is private to only league participants.

If it's too late to join a league, but you want to stay up to date on the latest happenings or would just like to communicate with those outside of your league, groups are for you. Each group has its own message board so users can communicate with each other.

## Backend

Information about the backend of Bracket Busters can be found here: [Bracket Busters Backend](https://github.com/brianbixby/bracket-busters-back-end)

## Tech/Framework/Packages

- Node 
- MongoDB
- Travis
- heroku
- github
- npm
- Frontend Node packages:
  - Autoprefixer          
  - Babel-core         
  - Babel-plugin-transform-class-properties          
  - Babel-plugin-transform-object-rest-spread          
  - Babel-preset-env          
  - Babel-preset-react                        
  - Cors                   
  - Dotenv          
  - Express          
  - Node-sass         
  - NPM          
  - Parcel-bundler
  - Postcss-modules          
  - React                   
  - React-dom          
  - React-redux          
  - React-router          
  - React-router-dom          
  - Redux                          
  - Superagent                  
  - Validator                  
- devDependencies:
  - Babel-jest
  - Babel-plugin-stylus-compiler
  - Babel-plugin-transform-async-to-generator
  - Babel-plugin-transform-css-import-to-string
  - Babel-plugin-transform-es2015-modules-amd
  - Babel-plugin-transform-es3-member-expression-literals
  - Babel-plugin-transform-es3-property-literals
  - Babel-plugin-transform-object-assign
  - Babel-plugin-transform-version-inline
  - Babel-preset-es2015
  - Babel-preset-stage-0     
  - Enzyme          
  - Enzyme-adapter-react-16          
  - Eslint          
  - Eslint-plugin-react          
  - Jest          
  - Redux-devtools-extension
  - Redux-logger

- Backend Node packages:
  - Production
    - Bcryptjs
    - Bluebird
    - Cors
    - Coveralls
    - Crypto 
    - Debug 
    - Del 
    - Dotenv 
    - Express  
    - Http-errors 
    - Istanbul 
    - Jsonwebtoken 
    - Mongoose 
    - Morgan
  - Development
    - Eslint
    - Faker
    - Jest
    - Superagent 

## Component Tree
```
<App>
  <Navbar>
    <Avatar>

  <LandingContainer>
    <Intro>
      <Modal>
      <UserAuthForm>
        <ToolTip>
    <BannerAd>
    <CreateSection>
      <Slider>
      <JoinSection>
    <Table>
    <Modal>
    <LeagueForm>
      <ToolTip>
    <GroupForm>
      <ToolTip>
    <ProfileForm>

  <LeagueItemContainer>
    <BannerAd>
    <GameItem>
    <UserPickItem>
    <MessageBoardContainer>
      <CommentForm>
      <CommentItem>
      <Modal>
    <Table>

  <GroupItemContainer>
    <BannerAd>
    <MessageBoardContainer>
      <CommentForm>
      <CommentItem>
      <Modal>
    <Table>

  <LeagueAllContainer>
    <BannerAd>
    <LeagueAllPrivateForm>
      <ToolTip>
    <Table>

  <GroupAllContainer>
    <BannerAd>
    <GroupAllPrivateForm>
      <ToolTip>
    <Table>

  <ProfileContainer>
    <BannerAd>
    <ProfileForm>
```

## License

MIT © [Brian Bixby](https://github.com/brianbixby),