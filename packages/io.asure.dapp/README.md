Requirements

- Java JDK === V1.8 / JAVA8 (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- Android SDK (maybe just install Android Studio)
- Download Gradle to "C:\gradle" (https://gradle.org)

Installation:
Add environment variables:

- JAVA_HOME="Path to your JDK"
- ANDROID_HOME="Path to your Android SDK"
- \_JAVA_OPTIONS = "-Xmx512M"
- ANDROID_SDK_ROOT = %ANDROID_HOME%
- GRADLE_HOME = "C:\gradle\gradle-4.9\"

Add to your PATH variable

    "%ANDROID_HOME%/tools"
    "%ANDROID_HOME%/tools/bin"
    "%ANDROID_HOME%/platform-tools"
    "C:\gradle\gradle-4.9\bin"
    "%JAVA_HOME%\bin"
    "C:\OpenSSL\bin"
