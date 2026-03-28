# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep Square Mobile Payments SDK
-keep class com.squareup.sdk.** { *; }
-keep interface com.squareup.sdk.** { *; }
-dontwarn com.squareup.sdk.**

# Keep Firebase
-keep class com.google.firebase.** { *; }
-keep interface com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Keep Google Play Services
-keep class com.google.android.gms.** { *; }
-keep interface com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Keep React Native
-keep class com.facebook.react.** { *; }
-keep interface com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep Kotlin
-keep class kotlin.** { *; }
-keep interface kotlin.** { *; }
-dontwarn kotlin.**

# Suppress optional classes referenced by transitive deps in release shrink step.
# Source: app/build/outputs/mapping/release/missing_rules.txt
-dontwarn com.google.protobuf.Descriptors$Descriptor
-dontwarn com.google.protobuf.Descriptors$FileDescriptor
-dontwarn com.google.protobuf.GeneratedMessageV3$Builder
-dontwarn com.google.protobuf.GeneratedMessageV3$FieldAccessorTable
-dontwarn com.google.protobuf.GeneratedMessageV3
-dontwarn com.google.protobuf.MapEntry
-dontwarn com.google.protobuf.MapField
-dontwarn com.google.protobuf.Message
-dontwarn com.google.protobuf.MessageOrBuilder
-dontwarn com.google.protobuf.ProtocolMessageEnum
-dontwarn com.google.protobuf.UnknownFieldSet
-dontwarn java.sql.JDBCType
-dontwarn org.slf4j.Logger
-dontwarn org.slf4j.LoggerFactory
