export type SampleStream = {
  title: string
  video: string
  span: 1 | 2
  portrait?: boolean
}

export type Sample = {
  id: string
  title: string
  preview: string
  streams: SampleStream[]
  rrdUrl: string
}

export const samples: Sample[] = [
  {
    id: "cafeteria-cleanup",
    title: "Cafeteria Cleanup",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_exo.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_head.mp4", span: 2 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_wristright.mp4", span: 1 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_fsr_heatmap.mp4", span: 2 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_exo.mp4", span: 2 },
    ],
    rrdUrl: "",
  },
  {
    id: "pantry",
    title: "Pantry",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/4/scaled_output_4_camera_exo.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/4/scaled_output_4_camera_head.mp4", span: 2 },
      { title: "Left Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/4/scaled_output_4_camera_wristleft.mp4", span: 1 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/4/scaled_output_4_fsr_heatmap.mp4", span: 2 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/4/scaled_output_4_camera_exo.mp4", span: 2 },
    ],
    rrdUrl: "",
  },
  {
    id: "kitchen-prep",
    title: "Kitchen Prep",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_camera_wristright.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled-output-7-camera-head_b.mp4", span: 2 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_camera_wristright.mp4", span: 1 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_fsr_heatmap.mp4", span: 2 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_camera_exo.mp4", span: 2 },
    ],
    rrdUrl: "",
  },
  {
    id: "lego-assembly",
    title: "Lego Assembly",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_camera_wristright.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_camera_head.mp4", span: 2 },
      { title: "Left Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_camera_wristleft.mp4", span: 1 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_camera_wristright.mp4", span: 1 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_camera_exo.mp4", span: 2 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/1/scaled_output_1_fsr_heatmap.mp4", span: 2 },
    ],
    rrdUrl:
      "https://saturnlabsdevind.blob.core.windows.net/datasamples/1_foxglove_depth_trimmed.rrd?sp=r&st=2026-04-15T06:39:12Z&se=2026-09-01T14:54:12Z&spr=https&sv=2025-11-05&sr=b&sig=dcYEdeYyShQIsIaSKMctzx4K4pnKQS4CwDhfHRbKYsU%3D",
  },
  {
    id: "folding-clothes-1",
    title: "Folding Clothes 1",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/8/scaled_output_8_camera_exo.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/8/scaled_output_8_camera_head.mp4", span: 2 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/8/scaled_output_8_camera_wristright.mp4", span: 1 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/8/scaled_output_8_fsr_heatmap.mp4", span: 2 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/8/scaled_output_8_camera_exo.mp4", span: 2 },
    ],
    rrdUrl: "",
  },
  {
    id: "folding-clothes-2",
    title: "Folding Clothes 2",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_camera_head.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_camera_head.mp4", span: 2 },
      { title: "Left Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_camera_wristleft.mp4", span: 1 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_camera_wristright.mp4", span: 1 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_camera_exo.mp4", span: 2 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/9/scaled_output_9_fsr_heatmap.mp4", span: 2 },
    ],
    rrdUrl:
      "https://saturnlabsdevind.blob.core.windows.net/datasamples/2_foxglove_compressed.rrd?sp=r&st=2026-04-13T19:51:55Z&se=2026-09-01T04:06:55Z&spr=https&sv=2025-11-05&sr=b&sig=LgfIQT32rdSMwvI06276rIPsJNd8W4QS1x5hMRW5uUE%3D",
  },
  {
    id: "tidying-up",
    title: "Tidying Up",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_camera_wristleft.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_camera_head.mp4", span: 2 },
      { title: "Left Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_camera_wristleft.mp4", span: 1 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_camera_wristright.mp4", span: 1 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_camera_exo.mp4", span: 2 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/2/scaled_output_2_fsr_heatmap.mp4", span: 2 },
    ],
    rrdUrl: "",
  },
  {
    id: "electronics-assembly",
    title: "Electronics Assembly",
    preview: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_camera_wristright.mp4",
    streams: [
      { title: "Stereo Egocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_camera_head.mp4", span: 2 },
      { title: "Left Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_camera_wristleft.mp4", span: 1 },
      { title: "Tactile Force Sensor", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_fsr_heatmap.mp4", span: 2 },
      { title: "Right Wrist Cam", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_camera_wristright.mp4", span: 1 },
      { title: "Stereo Exocentric", video: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/3/scaled_output_3_camera_exo.mp4", span: 2 },
    ],
    rrdUrl:
      "https://saturnlabsdevind.blob.core.windows.net/datasamples/3_foxglove_compressed.rrd?sp=r&st=2026-04-13T19:52:56Z&se=2026-09-01T04:07:56Z&spr=https&sv=2025-11-05&sr=b&sig=Xn%2BGbD5FFUQUvmIMppRlTZwkHlfZsT5ld%2BA5hgE8jms%3D",
  },
]

export function getSampleById(id: string): Sample | undefined {
  return samples.find((s) => s.id === id)
}
