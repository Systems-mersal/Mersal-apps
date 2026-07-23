import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

cssInterop(SafeAreaView, { className: "style" });
cssInterop(LinearGradient, { className: "style" });
cssInterop(ImageBackground, { className: "style" });
