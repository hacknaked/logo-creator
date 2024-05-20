import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Combobox from "./forms/Combobox";
import Form from "./forms/Form";
import Textfield from "./forms/Textfield";
import Textarea from "./forms/Textarea";

const logoStyleValues = [
  {id: "Minimalistic", name: "Minimalistic"},
  {id: "PowerAndStrength", name: "Power and strength"},
  {id: "NaturalElegance", name: "Natural elegance"},
  {id: "HarmoniousIntegration", name: "Harmonious integration"},
  {id: "FuturisticVibes", name: "Futuristic vibes"},
  {id: "CommunityUnity", name: "Community unity"},
  {id: "ConnectedWorld", name: "Connected world"},
  {id: "TranquilityAndSerenity", name: "Tranquility and serenity"},
];

const colorValues = [
  "Oceanic blues",
  "Earthy tones",
  "Sunset oranges",
  "Autumn yellows",
  "Forest greens",
  "Desert sands",
  "Rustic reds",
  "Pink hues",
  "Coral tints",
  "Zinc grays",
  "Midnight blacks",
  "Muted neutrals",
];

export const GENERATE_LOGO = gql`
  mutation GenerateLogo($input: GenerateLogoInput!) {
    generateLogo(input: $input) {
      id
      url
    }
  }
`;

const GenerateLogo = () => {
  const navigate = useNavigate();

  const onCompleted = () => {
    navigate("/");
  };
  return (
    <div className="mx-auto max-w-[520px] p-1">
      <Form mutation={GENERATE_LOGO} onCompleted={onCompleted}>
        <Textfield name="companyName" label="Company name" required={true} />
        <Textarea
          name="companyDescription"
          label="Brief description of the company or service"
        />
        <Combobox name="logoStyle" label="Logo style" values={logoStyleValues} />
        <Combobox name="color" label="Colors" values={colorValues} />
        <Textarea name="customPrompt" label="Custom AI prompt" />
      </Form>
    </div>
  );
};

export default GenerateLogo;
