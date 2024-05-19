import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Combobox from "./forms/Combobox";
import Form from "./forms/Form";
import Textfield from "./forms/Textfield";
import Textarea from "./forms/Textarea";

const logoStyles = [
  "Minimalistic",
  "Power and strength",
  "Harmonious integration",
  "Futuristic vibes",
  "Community unity",
  "Connected world",
  "Simplicity in complexity",
  "Bold innovation",
  "Natural elegance",
  "Responsible finance",
];

const colors = [
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
        <Textfield name="companyName" label="Company name" />
        <Textarea
          name="companyDescription"
          label="Brief description of the company or service"
        />
        <Combobox name="logoStyles" label="Logo style" values={logoStyles} />
        <Combobox name="colors" label="Colors" values={colors} />
        <Textarea name="customPrompt" label="Custom AI prompt" />
      </Form>
    </div>
  );
};

export default GenerateLogo;
