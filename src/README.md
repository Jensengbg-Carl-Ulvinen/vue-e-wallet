# Inlämningsuppgift 1 - E-wallet

Du ska bygga en digital plånbok som samlar alla kreditkort. Det ska gå och se sina kreditkort samt lägga till ett nytt.

**Figmaskiss:** https://www.figma.com/file/G4ep4nWFUplM8kXEntq83C/E-Wallet?node-id=11%3A2

## Instruktioner

**För att få Godkänt ska du:**

- Ha gjort uppgiften med `vue create`
- Gjort enligt Figma skissen (det behöver inte vara exakt enligt design)
- Det är en single file application (SPA) som använder `vue-router`
- Kan komma något mer i veckan

**För att Väl Godkänt ska du:**

- Spara korten och alla nya kort som läggs till i local storage samt läsa från local storage
- Det ska gå att ta bort ett kort (som också tas bort från local storage)
- Fälten när en kort läggs till ska valideras så du i fältet kortnummer enbart kan mata in siffror och \* max är 16 siffror. Fältet för namn ska enbart ta bokstäver.

### Komponentarkitektur

![alt text](components-e-wallet.png)
