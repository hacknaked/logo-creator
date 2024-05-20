
import { LogoStyle } from "./types/graphql"

const promptTemplates = {
    [LogoStyle.Minimalistic]: `
        Design a minimalistic logo for company "{{companyName}}". 
        Combine clean lines, negative space, and a limited color palette 
        of {{color}} to convey simplicity, modernity, and technological advancement.
    `,
    [LogoStyle.NaturalElegance]: `
        Create a logo for a shop named "{{companyName}}", natural elegance, 
        consider incorporating organic shapes, subtle gradients and {{color}} 
        to convey a sense of stability and elegance.
    `,
    [LogoStyle.PowerAndStrength]: `
        Design a logo that symbolizes the power and strength of company "{{companyName}}".
        Experiment with bold typography, solid lines, and {{color}} 
        to represent the robustness of the concept.
    `,
    [LogoStyle.HarmoniousIntegration]: `
        Create a logo that showcases the harmonious integration of different elements   
        in the "{{companyName}}" ecosystem. Play with geometric shapes, overlapping patterns, 
        and {{color}} colors to highlight the concept of stability through integration.
    `,
    [LogoStyle.FuturisticVibes]: `
        Design a logo that portrays the futuristic nature of "{{companyName}}". 
        Use sleek lines, metallic accents, and a contemporary color palette of {{color}} 
        to convey a sense of innovation and cutting-edge technology.
    `,
    [LogoStyle.CommunityUnity]: `
        Create a logo that embodies the sense of community and unity fostered by "{{companyName}}". 
        Use interconnected shapes, people silhouettes, and warm {{color}} colors to portray collaboration, 
        inclusivity, and solidarity.
    `,
    [LogoStyle.ConnectedWorld]: `
        Design a logo that symbolizes the connectedness "{{companyName}}" across the globe. 
        Utilize globe elements, network patterns, and vibrant {{color}} colors to represent the global 
        reach and impact of stable diffusion.
    `,
    [LogoStyle.TranquilityAndSerenity]: `
        Design a logo that evokes a sense of tranquility and serenity associated with "{{companyName}}". 
        Use soft {{color}} colors, gentle curves, and fluid shapes to create a peaceful and calming 
        visual representation.
    `
}

export default promptTemplates
