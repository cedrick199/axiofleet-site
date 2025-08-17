import * as React from "react"
import { Typography, Stack } from "@mui/material"
export default function SectionTitle({title, subtitle}){
  return (
    <Stack spacing={1} sx={{mb:3}}>
      <Typography variant="h3" sx={{fontWeight:800}}>{title}</Typography>
      {subtitle && <Typography sx={{color:"text.secondary"}}>{subtitle}</Typography>}
    </Stack>
  )
}
