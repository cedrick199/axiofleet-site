import * as React from "react"
import { Container, Box } from "@mui/material"
export default function Section({children, sx, maxWidth="lg"}){
  return (
    <Container maxWidth={maxWidth} sx={{py:{xs:6,md:10}}}>
      <Box sx={sx}>{children}</Box>
    </Container>
  )
}
