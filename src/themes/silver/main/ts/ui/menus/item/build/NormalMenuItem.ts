import { UiFactoryBackstageProviders } from '../../../../backstage/Backstage';
import { Disabling } from '@ephox/alloy';
import { ItemSpec } from '@ephox/alloy/lib/main/ts/ephox/alloy/ui/types/ItemTypes';
import { Menu } from '@ephox/bridge';
import { Option } from '@ephox/katamari';

import { renderItemStructure } from '../structure/ItemStructure';
import { buildData, renderCommonItem } from './CommonMenuItem';
import ItemResponse from '../ItemResponse';

// Note, this does not create a valid SketchSpec.
const renderNormalItem = (spec: Menu.MenuItem, itemResponse: ItemResponse, providersBackstage: UiFactoryBackstageProviders): ItemSpec => {
  const getApi = (component): Menu.MenuItemInstanceApi => {
    return {
      isDisabled: () => Disabling.isDisabled(component),
      setDisabled: (state) => state ? Disabling.disable(component) : Disabling.enable(component)
    };
  };

  const structure = renderItemStructure({
    presets: 'normal',
    iconContent: spec.icon,
    textContent: spec.text,
    ariaLabel: spec.text,
    caret: Option.none(),
    checkMark: Option.none(),
    shortcutContent: spec.shortcut
  }, providersBackstage);

  return renderCommonItem({
    data: buildData(spec),
    getApi,
    disabled: spec.disabled,
    onAction: spec.onAction,
    onSetup: spec.onSetup,
    triggersSubmenu: false,
    itemBehaviours: [ ]
  }, structure, itemResponse);
};

export { renderNormalItem };
