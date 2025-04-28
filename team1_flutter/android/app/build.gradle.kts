plugins {
  id("com.android.application")
  id("kotlin-android")
  id("dev.flutter.flutter-gradle-plugin")
}

// Kotlin에서는 val 또는 var로 변수를 선언합니다.
val javaVersion = JavaVersion.VERSION_11 // 또는 JavaVersion.VERSION_1_8 등 필요에 따라 설정

android {
  namespace = "com.example.test2"
  compileSdk = flutter.compileSdkVersion
  ndkVersion = "27.0.12077973" // ndkVersion은 보통 Flutter 설정에 따르거나 특정 버전 명시

  compileOptions {
    sourceCompatibility = javaVersion
    targetCompatibility = javaVersion
    // Kotlin에서는 boolean 값을 할당할 때 '=' 를 사용합니다.
    isCoreLibraryDesugaringEnabled = true
  }

  kotlinOptions {
    jvmTarget = javaVersion.toString()
  }

  defaultConfig {
    applicationId = "com.example.test2"
    // flutter.minSdkVersion 접근이 안될 경우, 명시적으로 숫자를 넣거나 다른 방법 확인 필요
    minSdk = flutter.minSdkVersion
    targetSdk = flutter.targetSdkVersion
    versionCode = flutter.versionCode
    versionName = flutter.versionName

    // minSdkVersion 확인 후 multiDex 설정 (Kotlin 문법 적용)
    // Flutter가 minSdk 정보를 가져오는 방식에 따라 flutter.minSdkVersion 접근이 필요할 수 있습니다.
    // 만약 아래 라인에서 flutter 참조 오류가 나면, 숫자를 직접 넣거나 다른 변수 확인 필요
    if (flutter.minSdkVersion!! < 21) { // Non-null assertion (!!) 사용, minSdk가 null이 아님을 가정
      multiDexEnabled = true
    }
  }

  buildTypes {
    release {
      // Kotlin에서는 getByName<>() 을 사용하고 signingConfig 참조를 설정합니다.
      signingConfig = signingConfigs.getByName("debug") // TODO: 릴리스 시에는 실제 릴리스 서명 설정으로 변경
      // 릴리스 빌드 시 코드 축소 및 난독화 활성화 (Kotlin 문법)
      // isMinifyEnabled = true
      // isShrinkResources = true
      // proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }

  // signingConfigs 블록 (Kotlin 문법)
  // signingConfigs {
  //     maybeCreate("debug") // 기본 debug는 보통 내장되어 있음
  //     create("release") {
  //         // TODO: 여기에 실제 릴리스 키스토어 정보를 입력하세요.
  //         // storeFile = file("path/to/your/release.keystore")
  //         // storePassword = "your_store_password"
  //         // keyAlias = "your_key_alias"
  //         // keyPassword = "your_key_password"
  //     }
  // }
}

dependencies {
  // 코어 라이브러리 디슈가링 의존성 (Kotlin 문법)
  coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4") // 최신 안정 버전 권장

  // minSdkVersion이 21 미만이고 multiDexEnabled true를 사용했다면, 이 의존성이 필요합니다. (Kotlin 문법)
  // defaultConfig 블록의 multiDexEnabled 설정 로직과 연동하여 필요 여부 판단
  // 조건부 추가: defaultConfig 접근이 필요할 수 있음
  val needsMultidex = project.extensions.getByType<com.android.build.gradle.AppExtension>().defaultConfig.minSdkVersion!!.apiLevel < 21 &&
      project.extensions.getByType<com.android.build.gradle.AppExtension>().defaultConfig.multiDexEnabled ?: false
  if (needsMultidex) {
    implementation("androidx.multidex:multidex:2.0.1") // androidx 버전 사용 권장
  }


  // Kotlin 표준 라이브러리 (보통 Flutter가 자동으로 추가, Kotlin 문법)
  // kotlin_version 변수는 보통 프로젝트 레벨 build.gradle.kts 에 정의됩니다.
  // val kotlin_version: String by project // 프로젝트 레벨에서 가져오기
  // implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlin_version")
  // 또는 Flutter Gradle 플러그인이 제공하는 버전을 사용할 수 있습니다. (확인 필요)
  // implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:${extra["kotlinVersion"]}") // 예시

  // 기타 필요한 앱 의존성 추가
}

flutter {
  source = "../.."
}