#pragma once
#ifndef TestDll_H_
#define TestDll_H_
#ifdef MYLIBDLL
#define MYLIBDLL extern "C" _declspec(dllimport)
#else
#define MYLIBDLL extern "C" _declspec(dllexport)
#endif
MYLIBDLL float Add(float plus1, float plus2);
MYLIBDLL int WriteXLSX(char* cadFile, char* logDir, bool bX, bool bY, bool bZ, float fX, float fY, float fZ);
#endif