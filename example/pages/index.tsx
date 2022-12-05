/* eslint-disable */
import styled from "@emotion/styled";
import { Box, Flex, Grid, Typography } from "e-prim";
import { ArrowIcon } from "../arrow-icon";
import { Button } from "../button";

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  color: palette.warning.normal,
}));

export default function () {
  return (
    <Flex direction="column" gap={4} p={4} width="100%" m={{ xs: 2, md: 4 }}>
      <Typography variant="title.1">e-prim</Typography>

      <Typography variant="body.1" as="p">
        A set of tools to implement a design system on top of @emotion/css and @emotion/react as well as add some
        primitive components to make prototyping UI faster and easier
      </Typography>

      <ArrowIcon color="success.normal" size={32} />

      <Button>Test Button</Button>

      <Box
        onClick={console.log}
        p={4}
        shadow="xl"
        css={({ breakpoint, palette }) => ({
          width: breakpoint.md,
          color: palette.neutral[0],
        })}
      >
        <Typography variant="title.1" p={4}>
          test
        </Typography>
      </Box>

      <StyledBox>Styled Text</StyledBox>

      <Flex direction={{ xs: "column", md: "row" }} gap={{ xs: 2, md: 4 }} p={4} background="neutral.6">
        <Box background="neutral.3" p={4}>
          item1
        </Box>
        <Box background="transparent" p={4}>
          item2
        </Box>
      </Flex>

      <Grid columns={[2, [100, 200]]}>
        <Box>item1</Box>
        <Box>item2</Box>
      </Grid>

      <Grid
        columns={{
          xs: [2],
          md: [1, 100],
        }}
      />
    </Flex>
  );
}
