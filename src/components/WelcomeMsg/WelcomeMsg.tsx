import { StyledGreetings } from "../../aseets/styled/BootStrapGreetings";
import GenericMsg from "./Greetings/GenericMsg";
import PersonalizedMsg from "./Greetings/PersonalizedMsg";

const WelcomeMsg = ({ nickname } : {nickname : string} ) => {
    const MessageComponent = nickname !== undefined ? PersonalizedMsg : GenericMsg;
  
    return (
      <StyledGreetings>
        <MessageComponent nickname={nickname} />
      </StyledGreetings>
    );
  };
  
  export default WelcomeMsg;