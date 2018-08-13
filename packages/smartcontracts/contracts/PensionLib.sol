pragma solidity ^0.4.23;

library PensionLib {
  enum ContractType {
    PensionPoints,
    PensionSettings,
    PensionUsers,
    Pension,
    PensionWallet
  }

  enum PensionType {
    Default //Renten wegen Alters
    /*
    Renten wegen Alters	1,0
    Renten wegen voller Erwerbsminderung	1,0
    Erziehungsrenten	1,0
    große Witwenrente	0,55
    Renten wegen teilweiser Erwerbsminderung	0,5
    kleine Witwenrente	0,25
    Vollwaisenrente	0,2
    Halbwaisenrente	0,1
    */
  }

  struct UserData {
    int256 birthDate; // unix timestamp
    uint256 pensionDate; // unix timestamp
    bool isPensioner;
    PensionType pensionType;
    uint256 listPointer;
  }


}
