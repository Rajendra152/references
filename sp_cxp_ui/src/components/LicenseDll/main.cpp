#include <iostream>
#include <string>
#include "LicEngine.h"

using namespace std;

void ShowLicEngineSample()
{
	cout << "--------- Sample check for LicEngine Methods Start----------  " << endl;
	cout << "\n";

	int nRetVal = 0, nProductCode = 1, nSearchMode = 1;
	char * sChkLicMsg = (char*)malloc(512 * sizeof(char));
	char * sProductName = (char*)malloc(32 * sizeof(char));
	char * sVersion = (char*)malloc(32 * sizeof(char));
	char * sLicType = (char*)malloc(64 * sizeof(char));
	char * sExpiryDays = (char*)malloc(32 * sizeof(char));
	char * sHostName = (char*)malloc(64 * sizeof(char));
	char * sLicInfoStatusMsg = (char*)malloc(512 * sizeof(char));
	char * sUserInfoMsg = (char*)malloc(512 * sizeof(char));
	char * sUserInfoMsgStatus = (char*)malloc(512 * sizeof(char));
	char * sC2V = (char*)malloc(1024 * sizeof(char));
	char * sC2VStatusMsg = (char*)malloc(512 * sizeof(char));
	char * sMgrTypeStatusMsg = (char*)malloc(512 * sizeof(char));
	char * sLog = (char*)malloc(4096 * sizeof(char));
	bool *bpValid = (bool*)malloc(1 * sizeof(bool));
	bool *bpTrial = (bool*)malloc(1 * sizeof(bool));
	int *nLogLen = (int*)malloc(1 * sizeof(int));
	int *npExpiryDays = (int*)malloc(1 * sizeof(int));
	int *npLicManagerType = (int*)malloc(1 * sizeof(int));

	char * sEMSPath = (char*)malloc(512 * sizeof(char));
	char * sEMSStatusMsg = (char*)malloc(512 * sizeof(char));


	*bpValid = false;
	*bpTrial = false;
	*nLogLen = 0;	
	*npExpiryDays = 0;
	*npLicManagerType = 1;

	nRetVal = StartLicenseEngine();
	nRetVal = InitLicenseManager(nProductCode);
	sEMSPath = "D:\\LicenseEngine\\LicFile\\ems.ini";  
	//sEMSPath = NULL; 
	nRetVal = LoadINIFileInfo(sEMSPath, sEMSStatusMsg); // sEMSPath = NULL will load the ems.ini path from default current running directory.


	nRetVal = CheckLicense(bpValid, bpTrial, npExpiryDays, sChkLicMsg);

	if (nRetVal == 1 && (*bpValid))
	{
		nRetVal = GetLicenseDetails(sProductName, sVersion, sLicType, sExpiryDays, sHostName, sLicInfoStatusMsg);
		if (nRetVal == 1)
		{
			cout << "License details  " << endl;
			cout << "\n";
			cout << "ProductName : " << sProductName << endl;
			cout << "Version : " << sVersion << endl;
			cout << "LicenseType : " << sLicType << endl;
			cout << "ExpiredInDays : " << sExpiryDays << endl;
			cout << "LicenseManager : " << sHostName << endl;
			cout << "\n";
			cout << sLicInfoStatusMsg << endl;
			cout << "\n";
		}
	}

	/* License Search Mode based information retrieval process : START  */
	/*nRetVal = SetLicenseSearchMode(nSearchMode); 
	nRetVal = LoadLicenseInfoForSettings(sProductName, sVersion, sLicType, sExpiryDays, sHostName, sLicInfoStatusMsg);
	if (nRetVal)
	{
		cout << "LoadLicenseInfoForSettings Process  " << endl;
		cout << "\n";
		cout << "ProductName : " << sProductName << endl;
		cout << "Version : " << sVersion << endl;
		cout << "LicenseType : " << sLicType << endl;
		cout << "ExpiredInDays : " << sExpiryDays << endl;
		cout << "LicenseManager : " << sHostName << endl;
		cout << "\n";
		cout << sLicInfoStatusMsg << endl;
		cout << "\n";
	}
	else
	{
		cout << "LoadLicenseInfoForSettings Process  " << endl;
		cout << "\n";
		cout << sLicInfoStatusMsg << endl;
		nRetVal = GetUserMsgInfo(sUserInfoMsg, sUserInfoMsgStatus);
		cout << sUserInfoMsg;
	}*/
	/* License Search Mode based information retrieval process : END  */


	
    // The below ActivateLicense API can be used for both V2C / ProductKey License Apply Process based on nApplyLicType 
	
	/*int nApplyLicType = 1;  //  0 - For V2C; 1 - For Product Key
	char * sLicSrc = (char*)malloc(512 * sizeof(char));
	char * sLicStatusInfo = (char*)malloc(512 * sizeof(char));
	//sLicSrc = "D:\\LicenseEngine\\LicFile\\TestSignma.v2c";  // Physical V2C file path location on running machine
	sLicSrc = "9e06f0e3-5d4a-4dcb-88c2-7f9c522fb12f";      // sample product key

	nRetVal = ActivateLicense(nApplyLicType, sLicSrc, sLicStatusInfo);
	cout << "ActivateLicense status info : " << endl;
	cout << sLicStatusInfo << endl;
	cout << "\n";	*/
	
	nRetVal = GetC2VDetails(sC2V, sC2VStatusMsg);
	if (nRetVal == 1)
	{
		cout << "C2V info : " << endl;
		cout << "\n";
		cout << sC2V;
		cout << "\n";
	}
	else
		cout << sC2VStatusMsg << endl;

	nRetVal = GetLicenseManagerType(npLicManagerType, sMgrTypeStatusMsg);
	if (nRetVal == 1)
	{
		cout << "GetLicenseManagerType value : " << *npLicManagerType << endl;
		cout << "\n";
	}

	nRetVal = GetLogInfo(sLog, nLogLen);
	if (nRetVal == 1)
	{
		cout << "GetLogInfo : " << endl;
		cout << "\n";
		cout << sLog << endl;
		cout << "\n";
	}
	nRetVal = CloseLicenseManager();

	// Memory cleanup section for the created memory
	if (sChkLicMsg)
	{
		free(sChkLicMsg);
	}
	if (sProductName)
	{
		free(sProductName);
	}
	if (sVersion)
	{
		free(sVersion);
	}
	if (sLicType)
	{
		free(sLicType);
	}
	if (sExpiryDays)
	{
		free(sExpiryDays);
	}
	if (sHostName)
	{
		free(sHostName);
	}
	if (sLicInfoStatusMsg)
	{
		free(sLicInfoStatusMsg);
	}
	if (sC2V)
	{
		free(sC2V);
	}
	if (sC2VStatusMsg)
	{
		free(sC2VStatusMsg);
	}
	if (sMgrTypeStatusMsg)
	{
		free(sMgrTypeStatusMsg);
	}
	if (sLog)
	{
		free(sLog);
	}
	if (bpValid)
	{
		free(bpValid);
	}
	if (bpTrial)
	{
		free(bpTrial);
	}
	if (npExpiryDays)
	{
		free(npExpiryDays);
	}
	if (npLicManagerType)
	{
		free(npLicManagerType);
	}


	cout << "\n";
	cout << "--------- Sample check for LicEngine Methods End----------  " << endl;
	cout << "\n";
}

int main()
{
	ShowLicEngineSample();
	return 0;
}