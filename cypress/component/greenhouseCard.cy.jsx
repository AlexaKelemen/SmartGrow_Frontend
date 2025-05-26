import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter } from "react-router-dom";
import GreenhouseCard from "@/components/GreenhouseCard";
import sinon from "sinon"; 

describe("GreenhouseCard Component", () => {
  let onUnpair, onConfigure, onApplyPreset;

  beforeEach(() => {
    onUnpair = sinon.stub();
    onConfigure = sinon.stub();
    onApplyPreset = sinon.stub();

    mount(
      <MemoryRouter>
        <GreenhouseCard
          greenhouse={{
            id: 1,
            name: "Test Greenhouse",
            imageUrl: "",
            lightingMethod: "auto",
            wateringMethod: "manual",
            soilHumidity: 45,
          }}
          presets={[
            { id: 101, name: "Tomato Preset" },
            { id: 102, name: "Cucumber Preset" },
          ]}
          onUnpair={onUnpair}
          onConfigure={onConfigure}
          onApplyPreset={onApplyPreset}
        />
      </MemoryRouter>
    );
  });

  it("calls onUnpair when Unpair Greenhouse is clicked", () => {
    cy.contains("Unpair Greenhouse").click().then(() => {
      expect(onUnpair.calledOnce).to.be.true;
    });
  });

  it("calls onApplyPreset with selected preset", () => {
    cy.get("select").first().select("Tomato Preset");
    cy.contains("Apply Preset").click().then(() => {
      expect(onApplyPreset.calledWith(1, 101)).to.be.true;
    });
  });
});
