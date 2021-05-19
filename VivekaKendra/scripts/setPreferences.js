function loadPreferences()
{
	if(!(typeof g_InstOrgName === "undefined") && !(typeof IdInstOrgName === "undefined") && g_InstOrgName!="")
	{
		IdInstOrgName.innerHTML=g_InstOrgName;
	}
}
