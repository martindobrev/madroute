import { MadRoute } from './../domain/madroute';
import { GpsPosition } from './../domain/gpsposition';

const dummyRoute = new MadRoute();
dummyRoute.id = 1;
dummyRoute.location = 'Dummyland';
dummyRoute.name = 'My first dummy route';
dummyRoute.videoUrl = 'Place some Dummy VIDEO URL to embed here';
dummyRoute.gpsCoordinates = [
    new GpsPosition(42.623924, 23.367762, 0.0, 12.17, 133446.17),
    new GpsPosition(42.623928, 23.367699, 0.0, 9.73, 133447.19),
    new GpsPosition(42.623913, 23.367632, 0.0, 9.08, 133448.19),
    new GpsPosition(42.623898, 23.367565, 0.0, 9.62, 133449.19),
    new GpsPosition(42.623898, 23.367502, 0.0, 9.93, 133450.19),
    new GpsPosition(42.6239, 23.367435, 0.0, 10.03, 133451.19),
    new GpsPosition(42.623905, 23.36737, 0.0, 9.95, 133452.19),
    new GpsPosition(42.62391, 23.367306, 0.0, 9.71, 133453.19),
    new GpsPosition(42.623917, 23.36724, 0.0, 9.76, 133454.17),
    new GpsPosition(42.62392, 23.367174, 0.0, 9.98, 133455.17),
    new GpsPosition(42.62392, 23.367119, 0.0, 10.19, 133456.19),
    new GpsPosition(42.623924, 23.367002, 0.0, 10.14, 133458.0),
    new GpsPosition(42.623928, 23.366936, 0.0, 10.32, 133459.0),
    new GpsPosition(42.62393, 23.366873, 0.0, 10.06, 133500.0),
    new GpsPosition(42.62393, 23.36681, 0.0, 9.9, 133501.0),
    new GpsPosition(42.62393, 23.366747, 0.0, 10.04, 133502.0),
    new GpsPosition(42.623936, 23.366686, 0.0, 10.01, 133503.0),
    new GpsPosition(42.62394, 23.36662, 0.0, 10.04, 133504.0),
    new GpsPosition(42.62394, 23.366556, 0.0, 10.22, 133505.0),
    new GpsPosition(42.623943, 23.366491, 0.0, 10.26, 133506.0),
    new GpsPosition(42.623943, 23.366426, 0.0, 10.25, 133507.0),
    new GpsPosition(42.623947, 23.366364, 0.0, 10.22, 133508.0),
    new GpsPosition(42.623947, 23.366299, 0.0, 10.22, 133509.0),
    new GpsPosition(42.62395, 23.366234, 0.0, 10.26, 133510.0),
    new GpsPosition(42.623955, 23.366169, 0.0, 10.35, 133511.0),
    new GpsPosition(42.623955, 23.366104, 0.0, 10.3, 133512.0),
    new GpsPosition(42.62396, 23.36604, 0.0, 10.32, 133513.0),
    new GpsPosition(42.62396, 23.365973, 0.0, 10.32, 133514.0),
    new GpsPosition(42.623962, 23.36591, 0.0, 10.35, 133515.0),
    new GpsPosition(42.623962, 23.365845, 0.0, 10.39, 133516.0),
    new GpsPosition(42.623962, 23.36578, 0.0, 10.4, 133517.0),
    new GpsPosition(42.623966, 23.365715, 0.0, 10.42, 133518.0),
    new GpsPosition(42.623966, 23.365648, 0.0, 10.48, 133519.0),
    new GpsPosition(42.62397, 23.365582, 0.0, 10.51, 133520.0),
    new GpsPosition(42.62397, 23.365515, 0.0, 10.57, 133521.0),
    new GpsPosition(42.623974, 23.365448, 0.0, 10.73, 133522.0),
    new GpsPosition(42.623978, 23.365381, 0.0, 10.73, 133523.0),
    new GpsPosition(42.62398, 23.365314, 0.0, 10.71, 133524.0),
    new GpsPosition(42.62398, 23.365246, 0.0, 10.72, 133525.0),
    new GpsPosition(42.623985, 23.365181, 0.0, 10.69, 133526.0),
    new GpsPosition(42.62399, 23.365114, 0.0, 10.51, 133527.0),
    new GpsPosition(42.623993, 23.365047, 0.0, 10.56, 133528.0),
    new GpsPosition(42.623997, 23.36498, 0.0, 10.59, 133529.0),
    new GpsPosition(42.623997, 23.364914, 0.0, 10.62, 133530.0),
    new GpsPosition(42.623997, 23.364845, 0.0, 10.8, 133531.0),
    new GpsPosition(42.624, 23.364779, 0.0, 10.81, 133532.0),
    new GpsPosition(42.624004, 23.36471, 0.0, 10.83, 133533.0),
    new GpsPosition(42.62401, 23.364641, 0.0, 10.85, 133534.0),
    new GpsPosition(42.62401, 23.364573, 0.0, 11.14, 133535.0),
    new GpsPosition(42.624012, 23.364504, 0.0, 11.32, 133536.0),
    new GpsPosition(42.624016, 23.364431, 0.0, 11.35, 133537.0),
    new GpsPosition(42.624016, 23.364359, 0.0, 11.56, 133538.0),
    new GpsPosition(42.62402, 23.364285, 0.0, 11.54, 133539.0),
    new GpsPosition(42.62402, 23.364214, 0.0, 11.51, 133540.0),
    new GpsPosition(42.624023, 23.364141, 0.0, 11.51, 133541.0),
    new GpsPosition(42.624023, 23.36407, 0.0, 11.48, 133542.0),
    new GpsPosition(42.624027, 23.363997, 0.0, 11.56, 133543.0),
    new GpsPosition(42.62403, 23.363924, 0.0, 11.75, 133544.0),
    new GpsPosition(42.624035, 23.36385, 0.0, 11.79, 133545.0),
    new GpsPosition(42.624035, 23.363775, 0.0, 11.83, 133546.0),
    new GpsPosition(42.62404, 23.3637, 0.0, 11.84, 133547.0),
    new GpsPosition(42.624043, 23.36363, 0.0, 11.81, 133548.0),
    new GpsPosition(42.624046, 23.363558, 0.0, 11.77, 133549.0),
]

export const MAD_ROUTES = [dummyRoute];