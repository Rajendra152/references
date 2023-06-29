#ifndef LICENGINE_LIB_H
#define LICENGINE_LIB_H

#ifdef LICENGINE_EXPORTS
#ifdef _WIN64
#define LIC_ENGINE_API __declspec(dllexport)
#elif _WIN32
#define LIC_ENGINE_API __declspec(dllexport)
#else
#define LIC_ENGINE_API __attribute__ ((visibility("default")))
#endif
#else
#ifdef _WIN64
#define LIC_ENGINE_API __declspec(dllimport)
#elif _WIN32
#define LIC_ENGINE_API __declspec(dllimport)
#else
#define LIC_ENGINE_API
#endif
#endif

#endif